CREATE TABLE world (
    nomi TEXT PRIMARY KEY, -- Mamlakat nomi (asosiy kalit)
    qita TEXT, -- Qit'asi
    hudud INT, -- Maydon (km²)
    aholi INT, -- Aholi soni
    gdp BIGINT -- YAIM (GDP)
);


INSERT INTO
    world (nomi, qita, hudud, aholi, gdp)
VALUES (
        'Afg''oniston',
        'Osiyo',
        652230,
        25500100,
        20343000000
    ),
    (
        'Albaniya',
        'Yevropa',
        28748,
        2831741,
        12960000000
    ),
    (
        'Jazoir',
        'Afrika',
        2381741,
        37100000,
        188681000000
    ),
    (
        'Andorra',
        'Yevropa',
        468,
        78115,
        3712000000
    ),
    (
        'Angola',
        'Afrika',
        1246700,
        20609294,
        100990000000
    );

SELECT * FROM world;

SELECT nomi, aholi, hudud
FROM world
WHERE
    hudud >= 3000000
    OR aholi >= 25000000;