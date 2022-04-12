package com.lohika.morning.ml.spark.driver.service.lyrics;

public enum Genre {

    RAP("RAP", 0D),
    POP("POP", 1D),
    COUNTRY("COUNTRY", 2D),
    BLUES("BLUES", 3D),
    JAZZ("JAZZ", 4D),
    REGGAE("REGGAE", 5D),
    ROCK("ROCK", 6D),
    HIPHOP("HIP HOP", 7D),
    UNKNOWN("UNKNOWN", -1D);

    private final String name;
    private final Double value;

    Genre(final String name, final Double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Double getValue() {
        return value;
    }

}
