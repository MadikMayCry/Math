$(document).ready(function() {
    //Variables
    var bigV, p,
        y = 1.4,
        u = 10;

    var correctCount = 0;
    var correctArrays = [];
    var arraya = [
            [1, -1, -1],
            [5, -5, -2],
            [1, 3, 2]
        ],
        arrayb = [
            [1, -2, -1],
            [5, -3, 4],
            [2, 2, 1]
        ],
        arrayab = [
            [-6, -1, -6],
            [-24, 1, -27],
            [20, -7, 13]
        ],
        arrayba = [
            [-10, 6, 1],
            [-6, 22, 9],
            [13, -9, -4]
        ];
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
                    "userInput3": arrayab[0][2],
                    "userInput4": arrayab[1][0],
                    "userInput5": arrayab[1][1],
                    "userInput6": arrayab[1][2],
                    "userInput7": arrayab[2][0],
                    "userInput8": arrayab[2][1],
                    "userInput9": arrayab[2][2],
                    "userInput10": arrayba[0][0],
                    "userInput11": arrayba[0][1],
                    "userInput12": arrayba[0][2],
                    "userInput13": arrayba[1][0],
                    "userInput14": arrayba[1][1],
                    "userInput15": arrayba[1][2],
                    "userInput16": arrayba[2][0],
                    "userInput17": arrayba[2][1],
                    "userInput18": arrayba[2][2],
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
        generateValues(arraya);
        generateValues(arrayb);

        sumMatrix(arraya, arrayb, arrayab);
        sumMatrix(arrayb, arraya, arrayba);
        initalize();

    }

    function initalize() {
        assignValues("arraya", arraya);
        assignValues("arrayb", arrayb);

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
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                e[i][j] = Math.floor(Math.random() * 5 + 1) * (Math.random() < 0.5 ? -1 : 1);
            }
        }
    }

    function disableAns() {
        $("#generateRandom").prop("disabled", true);
        $("button:submit").prop("disabled", true);
    }
    function assignValues(e, b) {
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                $("." + e + [i] + [j]).html(b[i][j]);
            }
        }
    }

    function sumMatrix(a, b, arraysum) {
        var sum = 0;
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                for (var k = 0; k <= 2; k++) {
                    sum += a[i][k] * b[k][j];
                }
                arraysum[i][j] = sum;
                sum = 0;
            }
        }
        console.log(arraysum + " Answer");
    }



});
