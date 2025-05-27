package main

import (
	"bytes"
	"context"
	token "desktop/helper"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/cookiejar"
	"os"

	"github.com/joho/godotenv"
)

// Return type of almost every Go IPC function.
type Response struct {
	Ok   bool
	Text string
}

// App struct
type App struct {
	ctx    context.Context
	client *http.Client

	serverUrl string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// TODO - Implement a persistent cookie jar.
	jar, _ := cookiejar.New(nil)
	a.client = &http.Client{
		Jar: jar,
	}

	godotenv.Load()
	a.serverUrl = os.Getenv("SERVER_URL")
}

func (a *App) CheckAuthentication() *Response {
	resp, err := a.client.Get(a.serverUrl + "/api/riot/v1/@me")
	if err != nil {
		fmt.Printf("Failed to GET CheckAuthentication: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

type AuthenticatePayload struct {
	Url string `json:"url"`
}

func (a *App) Authenticate(payload AuthenticatePayload) *Response {
	jsonBody, err := json.Marshal(payload)

	fmt.Printf("body: %s\n", jsonBody)
	if err != nil {
		fmt.Printf("Failed to marshal JSON body: %v\n", err)
		return nil
	}

	resp, err := a.client.Post(a.serverUrl+"/api/riot/v1/auth", "application/json", bytes.NewReader(jsonBody))
	if err != nil {
		fmt.Printf("Failed to POST Authenticate: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

func (a *App) GetShallowMatches() *Response {
	resp, err := a.client.Get(a.serverUrl + "/api/riot/v1/matches/shallow")
	if err != nil {
		fmt.Printf("Failed to GET GetShallowMatches: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

func (a *App) GetPlayerInfo() *Response {
	resp, err := a.client.Get(a.serverUrl + "/api/riot/v1/user")
	if err != nil {
		fmt.Printf("Failed to GET GetPlayerInfo: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

func (a *App) Unauthenticate() *Response {
	resp, err := a.client.Post(a.serverUrl+"/api/riot/v1/unauth", "application/json", nil)
	if err != nil {
		fmt.Printf("Failed to POST Unauthenticate: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

func (a *App) GetRiotMatchInfo(uuid string) *Response {
	resp, err := a.client.Get(a.serverUrl + "/api/riot/v1/match/" + uuid)
	if err != nil {
		fmt.Printf("Failed to GET GetRiotMatchInfo: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

type FindNamePayload struct {
	Puuid string `json:"puuid"`
}

func (a *App) FindName(payload FindNamePayload) *Response {
	resp, err := a.client.Get(a.serverUrl + "/api/riot/v1/player/" + payload.Puuid + "/name")
	if err != nil {
		fmt.Printf("Failed to POST FindName: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

type FindRankPayload struct {
	Puuid string `json:"puuid"`
}

func (a *App) FindRank(payload FindRankPayload) *Response {
	resp, err := a.client.Get(a.serverUrl + "/api/riot/v1/player/" + payload.Puuid + "/rank")
	if err != nil {
		fmt.Printf("Failed to POST FindRank: %v\n", err)
		return nil
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Failed to parse response body: %v\n", err)
		return nil
	}

	statusOk := resp.StatusCode >= 200 && resp.StatusCode <= 299

	return &Response{
		Ok:   statusOk,
		Text: string(body),
	}
}

// TODO - Finish this function.
func (a *App) LocalAuthenticate() {
	val, err := token.GrabToken(a.ctx)

	data, tErr := json.MarshalIndent(val, "", "  ")
	if tErr != nil {
		return
	}
	fmt.Printf("%s\n%s\n", string(data), err.Error())
}
