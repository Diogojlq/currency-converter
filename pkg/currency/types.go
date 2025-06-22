package currency

import (
	"net/http"
)

type Response struct {
    Date string
    Rate float64
}

type Converter struct {
    BaseURL string
    Client  *http.Client
}