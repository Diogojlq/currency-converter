package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/Diogojlq/currency-converter/pkg/currency"
)

var Version = "1.1.0"

func main() {
	// If running as CLI (not 'serve'), use CLI mode
	if len(os.Args) > 1 && os.Args[1] != "serve" {
		if err := run(); err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			os.Exit(1)
		}
		return
	}

	// HTTP server mode
	http.HandleFunc("/api/currencies", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(currency.CurrencyCodes())
	})

	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}