$(document).ready(function() {
    //Variables
    var bigV, p,
        y = 1.4,
        u = 10;

    var correctCount = 0;
    var correctArrays = [];
    var arraya = [
        [1, -2, 1, 0],
        [-3, 2, 1, -2],
        [2, 1, 0, 1],
        [1, -2, 3, -2]
    ];
    var array1;
    var sum = 0;

    var allnonactiveCorrect = $('.user_input_field input[type="text"]').length;
    var allactiveCorrect;

    $("#userForms").submit(function(event) {

        allnonactiveCorrect = $('.user_input_field input[type="text"]').length;
        allactiveCorrect = $('.user_input_field.active input[type="text"]').length;

        correctArrays = new Array(allactiveCorrect);

        correctArrays.fill(0);

        event.preventDefault();

        var isValid = true;

        $('.user_input_field.active input[type="text"]').each(function() {

            if (!$.isNumeric($(this).val())) {
                isValid = false;
                wrongInput($(this));
            } else {
                var input = $(this);
                var inputId = input.attr("id");
                var inputVal = input.val();
                var values = {
                    "userInput1": arrayab[0][0],
                    "userInput2": arrayab[0][1],

                };

                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        correctArrays[correctCount] = 1;
                        sum = correctArrays.reduce((a, b) => a + b, 0);

                        if (correctArrays.every(allCorrectCheck)) {
                            console.log("all correct");
                            $(input).parent().parent().next(".user_input_field").slideDown().addClass("active");


                            console.log("Sum of corrects = " + sum);

                            if (allnonactiveCorrect == allactiveCorrect) {
                                mark(sum, allnonactiveCorrect);
                                disableAns();
                            }
                        }

                        return false;
                    } else {
                        wrongInput(input);
                        correctArrays[correctCount] = 0;
                    }
                });
                correctCount++;
            }
        });

        console.log(correctArrays.toString());

        correctCount = 0;

        if (!isValid) {
            Materialize.toast('Неверный ввод данных', 4000);
        }
    });

    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);

    function generateRandom() {
        // generateValues(arraya);

        array1 = [
            [arraya[0][1], arraya[0][2], arraya[0][3]],
            [arraya[2][1], arraya[2][2], arraya[2][3]],
            [arraya[3][1], arraya[3][2], arraya[3][3]],
        ];

        array2 = [
            [arraya[0][0], arraya[0][2], arraya[0][3]],
            [arraya[2][0], arraya[2][2], arraya[2][3]],
            [arraya[3][0], arraya[3][2], arraya[3][3]],
        ];

        array3 = [
            [arraya[0][0], arraya[0][1], arraya[0][3]],
            [arraya[2][0], arraya[2][1], arraya[2][3]],
            [arraya[3][0], arraya[3][1], arraya[3][3]],
        ];

        array4 = [
            [arraya[0][0], arraya[0][1], arraya[0][2]],
            [arraya[2][0], arraya[2][1], arraya[2][2]],
            [arraya[3][0], arraya[3][1], arraya[3][2]],
        ];

        console.log(array1);
        console.log(array2);
        console.log(array3);
        console.log(array4);

        delta();

        initalize();
    }

    function initalize() {
        assignValues("arraya", arraya);
    }

    function mark(sum, marks) {
        $("#mark").show();
        sum = Math.round((sum / marks) * 100 * 100) / 100;
        $("#markValue").html(sum);
        $("#markSend").html('<a href="problem' + sum + '">Завершить задачу</a>');
    }

    function wrongInput(argument) {
        $(argument).removeClass("correct");
        $(argument).addClass("wrong");
        setTimeout(function() {
            $(argument).removeClass("wrong");
        }, 2000);
    }

    function correctInput(argument) {
        $(argument).removeClass("wrong");
        $(argument).addClass("correct");

    }

    function show_answers(argument) {
        $("#generateRandom").prop("disabled", true);
        $("button:submit").prop("disabled", true);

        $(".answers").slideDown();
        $('html, body').animate({
            scrollTop: $("#solution").offset().top
        }, 1000);

        mark(sum, allnonactiveCorrect);
        assignValues("arrayab", arrayab);
        assignValues("arrayba", arrayba);
        disableAns();
    }

    function allCorrectCheck(argument) {
        return argument == 1;
    }

    function generateValues(e) {
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++) {
                e[i][j] = Math.floor(Math.random() * 5 + 1) * (Math.random() < 0.5 ? -1 : 1);
            }
        }
    }

    function disableAns() {
        $("#generateRandom").prop("disabled", true);
        $("button:submit").prop("disabled", true);
    }

    function assignValues(e, b) {
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++) {
                $("." + e + [i] + [j]).html(b[i][j]);
            }
        }
    }

    function deleteRow(arr, row) {
        arr = arr.slice(0); // make copy
        arr.splice(row - 1, 1);
        return arr;
    }

    function delta() {
        for (var i = 0; i < 4; i++) {
            sum += arraya[1][i] *
        }
    }


});
