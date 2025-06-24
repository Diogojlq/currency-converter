package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Diogojlq/currency-converter/pkg/currency"
)

func main() {
	http.HandleFunc("/api/currencies", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(currency.CurrencyCodes())
	})

	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}