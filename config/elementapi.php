<?php
use craft\elements\Entry;

return [
    'endpoints' => [
        'api/food.json' => function() {
            return [
                'elementType' => Entry::class,
                'criteria' => ['section' => 'food', 'limit' => 9],
                'transformer' => function(Entry $entry) {
                    $foodImage = $entry->foodimage->one();
                    return [
                        'title' => $entry->title,
                        'description' => $entry->description, // Fix the typo here
                        'price' => $entry->price,
                        'image' => ($foodImage ? $foodImage->url : null),
                    ];
                },
            ];
        },
    ],
];