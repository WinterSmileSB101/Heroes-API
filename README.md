# HeroesFire API (WEB CRAWLER)


[![Build Status](https://travis-ci.org/hnaoto/Heroes-API.svg?branch=master)](https://travis-ci.org/hnaoto/Heroes-API)

HeroesFire doesn't have an official API. This project is a simple web crawler that collects information from HeroesFire. User could retrieve data of guides, hero stat and etc. 

DEMO URL: https://heroesfire.herokuapp.com/

###Guide:


#### Get all the guides of a hero by name
```
Get /api/guide/get/all/:name
```

#### Response

http://heroesfire.herokuapp.com/api/guide/all/valla

Status: 200 OK


```
[
{
"url": "/hots/guide/equinoxs-valla-guide-24",
"votes": "286",
"date": "December 21, 2015"
},
{
"url": "/hots/guide/now-i-am-the-hunter-valla-guide-revised-461",
"votes": "54",
"date": "April 3, 2016"
},
{
"url": "/hots/guide/hungering-arrow-max-dps-alternate-multi-shot-build-4133",
"votes": "21",
"date": "August 20, 2015"
},
.....
]

```






#### Get detail of one guide by url


```
Get /api/guide/get?url='url'
```


#### Response


http://heroesfire.herokuapp.com/api/guide/get?url=hots/guide/chubbsz-li-li-guide-leoric-release-1296


Status: 200 OK

```
{
"title": "ChubbsZ Li Li Guide (Leoric Release)",
"date": "Aug 16, 2015",
"vote": "84",
"author": "ChubbsZ",
"skills": [
{
"level": "Level 1",
"skill": "conjurers-pursuit"
},
{
"level": "Level 4",
"skill": "mass-vortex"
},
{
"level": "Level 7",
"skill": "the-good-stuff"
},
{
"level": "Level 10",
"skill": "jug-of-1000-cups-talent"
},
{
"level": "Level 13",
"skill": "surging-winds"
},
{
"level": "Level 16",
"skill": "two-for-one"
},
{
"level": "Level 20",
"skill": "kung-fu-hustle"
}
],
"threats": [
"gazlowe",
"nazeebo",
"nova",
"rehgar",
...
]

}
```


#### Get detail of a hero by name: 


```
Get /api/hero/get?name='name'
```
#### Response


https://heroesfire.herokuapp.com/hero/get?name=valla

Status: 200 OK
```
{

    "name": "Valla",
    "description": "Valla witnessed the ferocity of hellspawn firsthand as the demons ravaged her village and left her for dead. Now, with no people to call her own, her only allegiance is to her cause: to rid Sanctuary of the demonic filth corrupting its lands. She also likes long walks on the beach, puppies, and crossbows.",
    "Damage": "9",
    "Utility": "1",
    "Survivability": "4",
    "Complexity": "3",
    "type": "Assassin",
    "images": 

[

    "http://us.battle.net/heroes/static/images/heroes/skins/thumbnails/valla_demonHunter.jpg?v=58-82"

],
"reviews": 

    [
        { }
    ]

}

```

#### Get detail of all the heroes: 


```
Get /api/hero/get/all
```

#### Response


Status: 200 OK

```

{

    "name": "Li-Ming",
    "description": "It&#x2019;s a generally agreed upon fact of life among the denizens of Sanctuary that wizards and magical mayhem are never far apart. Although she understands people&#x2019;s concerns, Li-Ming is entirely unapologetic for the destruction in her wake. She delights in unleashing devastating spells on her foes from afar, then teleporting away to frustrate her enemies&#x2019; attempts at striking back. Small minds may fear this kind of power, but Li-Ming wields the arcane forces of the universe with confidence and unmatched skill.",
    "Damage": "10",
    "Utility": "1",
    "Survivability": "3",
    "Complexity": "7",
    "type": "Assassin",
    "images": 

[

    "http://us.battle.net/heroes/static/images/heroes/skins/thumbnails/li-ming_rebelliousWizard.jpg?v=58-82"

],
"reviews": 

    [
        { }
    ]

},
{

    "name": "Gazlowe",
    "description": "Upon first glance, few would think of the diminutive Gazlowe as a fighter, but what he lacks in height, he more than makes up for in mechanical cunning. The newest mechanical exoskeleton he&apos;s been working on for example is an especially effective war machine&#x2014;when it&apos;s working.",
    "Damage": "5",
    "Utility": "6",
    "Survivability": "5",
    "Complexity": "6",
    "type": "Specialist",
    "images": 

[

    "http://us.battle.net/heroes/static/images/heroes/skins/thumbnails/gazlowe_bossOfRatchet.jpg?v=58-82"

],
"reviews": 

    [
        { }
    ]

},

....

```
