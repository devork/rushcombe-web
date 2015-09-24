var RCW = {};

(function(RCW) {

    var _RED = "#df4a32";
    var _WHITE = "#FFFFFF";

    var _elm;
    var _reset;
    var _squares = [];
    var _modifiying = false;

    var reset = function() {
        if (_modifiying === true) {
            return;
        }

        _modifiying = true;
        for (var idx = 0; idx < _squares.length; idx++) {
            if (_squares[idx].enabled) {
                _squares[idx].disable();
            }
        }

        _modifiying = false;
    };

    var start = function() {
        var square, row;
        _elm = document.getElementById("numberSquare");

        row = document.createElement("tr");

        for (var idx = 0; idx < 100; idx++) {

            if (idx > 0 && idx % 10 === 0) {
                _elm.appendChild(row);
                row = document.createElement("tr");
            }
            square = document.createElement("td");
            square.innerText = (idx + 1);
            square.enabled = false;

            square.enable = function() {
                this.style.backgroundColor = _WHITE;
                this.style.color = _RED;
                this.style.borderColor = _RED;
            };

            square.disable = function() {
                this.style.backgroundColor = _RED;
                this.style.color = _WHITE;
                this.style.borderColor = _WHITE;
            };

            square.onclick = function() {

                if (_modifiying === true) {
                    return;
                }

                if (this.enabled) {
                    this.disable();
                } else {
                    this.enable();
                }

                this.enabled = !this.enabled;

            };
            _squares.push(square);
            row.appendChild(square);
        }

        _elm.appendChild(row);

        _reset = document.getElementById("clear");
        _reset.onclick = reset;

    };

    RCW.start = start;

})(RCW);