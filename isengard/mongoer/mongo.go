package mongoer

import (
	"context"
	"errors"
	"fmt"
	"logger"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Mongo struct {
	mongo.Client
	Logger logger.Log
}

func GetInstance(URI string) (*mongo.Client, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	bsonOpts := &options.BSONOptions{
		UseJSONStructTags: true,
		NilMapAsEmpty:     true,
		NilSliceAsEmpty:   true,
	}
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(URI).SetServerAPIOptions(serverAPI).
		SetBSONOptions(bsonOpts)
	client, err := mongo.Connect(
		ctx,
		opts)

	return client, err
}
func GetDefaultRepo(logger logger.Log) (Mongo, error) {
	password, ok := os.LookupEnv("MONGO_USER_PASSWORD")
	if !ok {
		password = "password"
	}
	username, ok := os.LookupEnv("MONGO_USER_NAME")
	if !ok {
		username = "darvoid"
	}
	URI := fmt.Sprintf("mongodb+srv://%v:%v@%v.pipdzrs.mongodb.net/?retryWrites=true&w=majority", username, password, username)
	client, err := GetInstance(URI)
	if err != nil {
		logger.Error(err)
		return Mongo{}, errors.New("couldn't connect")
	}

	instance := Mongo{
		Logger: logger,
		Client: *client,
	}
	return instance, nil
}
func (mon Mongo) Save(table string, collection string, value any) {

	storage := mon.Client.Database(table).Collection(collection)
	_, err := storage.InsertOne(
		context.Background(),
		value,
	)
	if err != nil {
		mon.Logger.Error(err)
	}
}
func (mon Mongo) Delete(table, collection string, id string) {

	filter := bson.M{"id": id}
	storage := mon.Client.Database(table).Collection(collection)
	_, err := storage.DeleteOne(context.Background(), filter)
	if err != nil {
		mon.Logger.Error(err)
	}
}
