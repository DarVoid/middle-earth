package cli

import (
	"io"
	"os/exec"
)

func RunCommand(command string, args ...string) (string, error) {
	cmd := exec.Command(command, args...)

	// Create a pipe to capture the command's output
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", err
	}

	// Start the command
	if err := cmd.Start(); err != nil {
		return "", err
	}

	// Read the command's output as a string
	outputBytes, err := io.ReadAll(stdout)
	if err != nil {
		return "", err
	}

	// Wait for the command to finish
	if err := cmd.Wait(); err != nil {
		return "", err
	}

	// Convert the output bytes to a string
	output := string(outputBytes)

	return output, nil
}
