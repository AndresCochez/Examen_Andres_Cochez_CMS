<?php

namespace modules\customapimodule\controllers;

use Craft;
use craft\web\Controller;
use craft\elements\Entry;
use yii\web\Response;

class CarsController extends Controller
{
    // Allow anonymous access to this controller's actions
    protected array|bool|int $allowAnonymous = true;

    public function actionIndex(): Response
    {
        // Query the cars section
        $carEntries = Entry::find()
            ->section('cars')
            ->limit(100)
            ->all();

        // Prepare the data to be returned as JSON
        $cars = [];
        foreach ($carEntries as $car) {
            $carImage = $car->carsimage->one();
            $carData = [
                'id' => $car->id,
                'title' => $car->title,
                'description' => $car->description,
                'price' => $car->price,
                'image' => $carImage ? $carImage->url : null,
                'tags' => [],
            ];

            foreach ($car->carTags->all() as $tag) {
                $carData['tags'][] = $tag->title;
            }

            $cars[] = $carData;
        }

        // Return the data as JSON
        return $this->asJson($cars);
    }
}
