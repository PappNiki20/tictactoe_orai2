import Jatekter from "../Jatekter.js";

QUnit.module("játéktér ellenőrzés metódusainak tesztelése", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });
  QUnit.test("ellenorzes létezik-e", function (assert) {
    assert.ok(jatekter.ellenorzes, "létezik-e");
  });

  QUnit.test("getVizszintes létezik-e", function (assert) {
    assert.ok(jatekter.getVizszintes, "létezik-e");
  });

  QUnit.test("getFuggoleges létezik-e", function (assert) {
    assert.ok(jatekter.getFuggoleges, "létezik-e");
  });

  QUnit.test("getAtlo létezik-e", function (assert) {
    assert.ok(jatekter.getAtlo, "létezik-e");
  });
});
QUnit.module("Vízszintes tesztelések", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });
  QUnit.test("Üres a vízszintes", function (assert) {
    jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    assert.equal(jatekter.getVizszintes(), "   @   @   @");
  });

  QUnit.test("egymás mellett 3X", function (assert) {
    jatekter.lista = ["X", "X", "X", " ", " ", " ", " ", " ", " "];
    assert.equal(
      jatekter.getVizszintes(),

      "XXX@   @   @"
    );
  });

  QUnit.test("egymás mellett 3O", function (assert) {
    jatekter.lista = ["O", "O", "O", " ", " ", " ", " ", " ", " "];
    assert.equal(
      jatekter.getVizszintes(),

      "OOO@   @   @"
    );
  });

  QUnit.test("random elrendezés", function (assert) {
    jatekter.lista = ["X", "O", "X", " ", " ", " ", " ", " ", " "];
    assert.equal(
      jatekter.getVizszintes(),

      "XOX@   @   @"
    );
  });

  QUnit.test("minden ki van töltve de nincs nyerés", function (assert) {
    jatekter.lista = ["X", "O", "X", "O", "O", "X", "X", "O", "X"];
    assert.equal(
      jatekter.getVizszintes(),

      "XOX@OOX@XOX@"
    );
  });
  QUnit.test("minden ki van töltve de van nyerés", function (assert) {
    jatekter.lista = ["X", "O", "X", "O", "O", "O", "X", "O", "X"];
    assert.equal(
      jatekter.getVizszintes(),

      "XOX@OOO@XOX@"
    );
  });

  QUnit.test("utolsó sor, kövi sor", function (assert) {
    jatekter.lista = ["X", "O", "X", " X", " X", " ", " ", " ", " "];
    assert.equal(
      jatekter.getVizszintes(),

      "XOX@ X X @   @"
    );
  });
});

QUnit.module("Függőleges tesztelések", function (hooks) {
  let jatekter;
  hooks.before(() => {
    jatekter = new Jatekter();
  });

  QUnit.test("Üres a függőleges", function (assert) {
    jatekter.lista = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    assert.equal(jatekter.getFuggoleges(), "   @   @   @");
  });
  QUnit.test("egymás mellett 3X", function (assert) {
    jatekter.lista = ["X", "O", "O", "X", "O", "O", "X", " ", " "];
    assert.equal(
      jatekter.getFuggoleges(),

      "XXX@OO @OO @"
    );
  });
  QUnit.test("egymás mellett 3  O", function (assert) {
    jatekter.lista = ["O", "X", "X", "O", "X", "X", "O", " ", " "];
    assert.equal(
      jatekter.getFuggoleges(),

      "OOO@XX @XX @"
    );
  });
  QUnit.test("véletlen elrendezés", function (assert) {
    jatekter.lista = ["O", "X", "X", "X", "X", "X", "O", " ", " "];
    assert.equal(
      jatekter.getFuggoleges(),

      "OXO@XX @XX @"
    );
  });
  QUnit.test("minden ki van töltve, nincs nyerés", function (assert) {
    jatekter.lista = ["O", "X", "X", "X", "X", "X", "O", "O", "O"];
    assert.equal(
      jatekter.getFuggoleges(),

      "OXO@XXO@XXO@"
    );
  });
  QUnit.test("utolsó sor, kövi sor", function (assert) {
    jatekter.lista = [" ", " ", "X", "X", " ", " ", "X", "", ""];
    assert.equal(
      jatekter.getFuggoleges(),

      " XX@  @X @"
    );
  });
});

QUnit.module("Átló tesztelések", function (hooks) {
    let jatekter;
    hooks.before(() => {
      jatekter = new Jatekter();
    }); 
    QUnit.test("Üres a Átló", function (assert) {
        jatekter.lista =   [" ", " ", " ",
                            " ", " ", " ", 
                            " ", " ", " "];
        assert.equal(jatekter.getAtlo(), 	
        "   @   ");
      });
      QUnit.test("3 X ", function (assert) {
        jatekter.lista =   ["X", " ", " ",
                            " ", "X", " ", 
                            " ", " ", "X"];
        assert.equal(jatekter.getAtlo(), 	
        "XXX@ X ");
      });
      QUnit.test("3 O ", function (assert) {
        jatekter.lista =   ["O", " ", " ",
                            " ", "O", " ", 
                            " ", " ", "O"];
        assert.equal(jatekter.getAtlo(), 	
        "OOO@ O ");
      });
      QUnit.test("Általános eset ", function (assert) {
        jatekter.lista =   ["O", " ", " ",
                            " ", "X", " ", 
                            " ", " ", "O"];
        assert.equal(jatekter.getAtlo(), 	
        "OXO@ X ");
      });
});