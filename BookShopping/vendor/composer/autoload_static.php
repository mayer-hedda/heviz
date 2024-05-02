<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc534196970d08851350c232c627c4b5f
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc534196970d08851350c232c627c4b5f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc534196970d08851350c232c627c4b5f::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitc534196970d08851350c232c627c4b5f::$classMap;

        }, null, ClassLoader::class);
    }
}
