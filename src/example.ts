interface Car {
  make: string;
  model: string;
}

class Vehicle {
  year: number = 2019;
  color: string = "red";
}

type Foo = Car | { running: boolean };

type SomeInput = string | number;

type cities = "Vienna" | "Manassas" | "Redlands" | "Charlotte";

enum OtherCities {
  Foo = "foo",
  Bar = "bar",
  Baz = "baz"
}

function someFn(x: SomeInput) {}

export default undefined;
