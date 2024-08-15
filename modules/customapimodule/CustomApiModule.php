<?php

namespace modules\customapimodule;

use Craft;
use craft\web\UrlManager;
use yii\base\Module;
use yii\base\Event;
use craft\events\RegisterUrlRulesEvent;

class CustomApiModule extends Module
{
    public function __construct($id, $parent = null, array $config = [])
    {
        Craft::setAlias('@modules/customapimodule', __DIR__);
        parent::__construct($id, $parent, $config);

        // Register URL rules when the application initializes
        Craft::$app->onInit(function() {
            $this->initializeModule();
        });
    }

    protected function initializeModule()
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                // Define the URL rule for the custom API endpoint
                $event->rules['GET api/cars'] = 'custom-api-module/cars/index';
            }
        );
    }
}