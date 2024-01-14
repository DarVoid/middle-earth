package barcode

import qrcode "github.com/skip2/go-qrcode"

func CreateQRCode(val string) ([]byte, error) {
	return qrcode.Encode(val, qrcode.Medium, 256)
}
