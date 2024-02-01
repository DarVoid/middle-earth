package cli_test

import (
	"cli"
	"fmt"
	"strings"
	"testing"
)

func TestMain(t *testing.M) {
	t.Run()
}

type commandTest struct {
	name        string
	command     string
	args        []string
	expectedOut string
}

func TestRunCommand(t *testing.T) {
	tests := []commandTest{
		{
			name:        "whomai",
			command:     "whoami",
			args:        nil,
			expectedOut: "duke",
		},
	}
	for _, item := range tests {
		out, _ := cli.RunCommand(item.command, item.args...)
		if item.expectedOut != strings.TrimSpace(out) {
			t.Errorf("Got: %v\n Expected: %v", out, item.expectedOut)
		}
	}
}

func ExampleRunCommand() {
	out, err := cli.RunCommand("whoami")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("%v", out)
	// Output:
	// duke
}
