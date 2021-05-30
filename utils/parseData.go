package utils

import (
	"time"
)

func ParseDate(date_in string) (time.Time, error) {
	layout := "2006-01-02T15:00:00.000Z"
	dob, err := time.Parse(layout, date_in)
	return dob, err
}
