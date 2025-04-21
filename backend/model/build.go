package model

// Build struct represents a custom pizza build.
type Build struct {
	Image    string  `json:"image,omitempty"`    // Image URL of the custom pizza
	Name     string  `json:"name,omitempty"`     // Name of the custom pizza
	Price    float64 `json:"price,omitempty"`    // Price of the custom pizza
	Quantity int     `json:"quantity,omitempty"` // Quantity of the custom pizza
}
