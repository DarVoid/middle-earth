package logger

import (
	"fmt"
	"time"
)

type Log interface {
	Error(err error)
	Warning(msg string)
	Info(msg string)
}

// returns an instance that just prints all as if normal msg preceded with level
func Exemplo() logger {
	return logger{}
}

type logger struct {
}

func (log logger) Error(err error) {
	currentTime := time.Now()
	fmt.Println(currentTime.Format("2006.01.02 15:04:05"), " Error: ", err)
}
func (log logger) Warning(err string) {
	currentTime := time.Now()
	fmt.Println(currentTime.Format("2006.01.02 15:04:05"), " Warning: ", err)
}
func (log logger) Info(err string) {
	currentTime := time.Now()
	fmt.Println(currentTime.Format("2006.01.02 15:04:05"), " Info: ", err)
}
