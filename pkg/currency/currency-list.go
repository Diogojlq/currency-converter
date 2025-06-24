package currency

import (
	"encoding/json"
	"net/http"

	"github.com/Diogojlq/currency-converter/pkg/utils"
)

func CurrencyListHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(utils.CurrencyCodes())
}