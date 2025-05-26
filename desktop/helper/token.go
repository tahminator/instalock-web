package token

import (
	"bufio"
	"context"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/user"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type RiotAuthInfo struct {
	Puuid            string
	AccessToken      string
	EntitlementToken string
	Port             string
	Password         string
}

type tokenResponse struct {
	Subject          string `json:"subject"`
	AccessToken      string `json:"accessToken"`
	EntitlementToken string `json:"token"`
}

func GrabToken(BaseURL string, ctx context.Context) (*RiotAuthInfo, error) {
	platform := runtime.Environment(ctx).Platform

	if platform != "Windows" {
		return nil, fmt.Errorf("this feature is only available on windows")
	}

	currentUser, err := user.Current()
	if err != nil {
		return nil, fmt.Errorf("failed to get current user: %w", err)
	}

	lockfilePath := fmt.Sprintf("C:/Users/%s/AppData/Local/Riot Games/Riot Client/Config/lockfile", currentUser.Username)

	file, err := os.Open(lockfilePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, exitWithMessage(1000, "Error: Valorant does not exist in the machine!")
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
		return nil, errors.New("invalid lockfile format")
	}

	name, pid, port, password, protocol := parts[0], parts[1], parts[2], parts[3], parts[4]
	_ = name
	_ = pid
	_ = protocol

	url := fmt.Sprintf("%s%s/entitlements/v1/token", BaseURL, port)

	// Ignore TLS verification like verify=False
	httpClient := &http.Client{
		Timeout: time.Second * 5,
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true}, // NOTE: Use cautiously
		},
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.SetBasicAuth("riot", password)

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, exitWithMessage(1, "Connection refused. Are you sure Valorant is running?")
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, exitWithMessage(1, "Connection refused. Are you sure Valorant is running?")
	}

	var token tokenResponse
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

func exitWithMessage(code int, msg string) error {
	fmt.Printf("%s\nExiting in 3 seconds...\n", msg)
	time.Sleep(3 * time.Second)
	os.Exit(code)
	return nil // unreachable
}
