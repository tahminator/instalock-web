package token

import (
	"bufio"
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/user"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// Return typr
type RiotAuthInfo struct {
	Puuid            string
	AccessToken      string
	EntitlementToken string
	Port             string
	Password         string
}

// Parse JSON Response from local server (only the things we care about)
type TokenResponse struct {
	Subject          string `json:"subject"`
	AccessToken      string `json:"accessToken"`
	EntitlementToken string `json:"token"`
}

func GrabToken(ctx context.Context) (*RiotAuthInfo, error) {
	platform := runtime.Environment(ctx).Platform

	if platform != "windows" {
		return nil, fmt.Errorf("this feature is only available on windows, while your platform is %s", platform)
	}

	currentUser, err := user.Current()
	if err != nil {
		return nil, fmt.Errorf("failed to get current user: %w", err)
	}

	// currentUser.Username returns "comp\name", but we only need "name"
	actualName := strings.Split(currentUser.Username, "\\")[1]

	lockfilePath := fmt.Sprintf("C:/Users/%s/AppData/Local/Riot Games/Riot Client/Config/lockfile", actualName)

	file, err := os.Open(lockfilePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, fmt.Errorf("error: valorant does not appear to exist on the machine. %w", err)
		}
		return nil, fmt.Errorf("failed to open lockfile: %w", err)
	}
	defer file.Close()

	reader := bufio.NewReader(file)
	line, err := reader.ReadString('\n')
	if err != nil && err != io.EOF {
		return nil, fmt.Errorf("failed to read lockfile: %w", err)
	}

	parts := strings.Split(strings.TrimSpace(line), ":")
	if len(parts) < 5 {
		return nil, fmt.Errorf("invalid lockfile format: expected 5 parts, found %d", len(parts))
	}

	name, pid, port, password, protocol := parts[0], parts[1], parts[2], parts[3], parts[4]
	// unused right now
	_ = name
	_ = pid
	_ = protocol

	url := fmt.Sprintf("https://127.0.0.1:%s/entitlements/v1/token", port)

	httpClient := &http.Client{
		Timeout: time.Second * 5,
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Add("Content-Type", "application/json")
	req.SetBasicAuth("riot", password)

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch entitlement token: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch entitlement token, expected %d, received %d", http.StatusOK, resp.StatusCode)
	}

	var token TokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&token); err != nil {
		return nil, fmt.Errorf("failed to decode token response: %w", err)
	}

	return &RiotAuthInfo{
		Puuid:            token.Subject,
		AccessToken:      token.AccessToken,
		EntitlementToken: token.EntitlementToken,
		Port:             port,
		Password:         password,
	}, nil
}
