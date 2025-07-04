package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Diogojlq/currency-converter/pkg/currency"
)

func withCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Permitir requisições do frontend
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		// Responder preflight (OPTIONS)
		if r.Method == http.MethodOptions {
			return
		}
		h(w, r)
	}
}

func convertHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var req struct {
		From   string  `json:"from"`
		To     string  `json:"to"`
		Amount float64 `json:"amount"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid request body"})
		return
	}
	converter := currency.NewConverter()
	rate, err := converter.Convert(req.Amount, req.From, req.To)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"result": rate})
}

func main() {
	http.HandleFunc("/api/currencies", withCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(currency.CurrencyCodes())
	}))

	http.HandleFunc("/api/convert", withCORS(convertHandler))

	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}