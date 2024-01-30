
$(document).ready(function () {

    let quiz =
    {
        question1: {
            makeMoneySellingInsurance: null
        },
        question2a: {
            grossWrittenPremium: null,
            lossRatio: null,
            imNotSureSelected: null
        },
        question2b: {
            spentOnAnnualPremiumms: null,
            imNotSureSelected: null
        },
        question3: {
            minClaimsAmount: null,
            maxClaimsAmount: null,
            imNotSureSelected: null
        },
        question4: {
            mostRelevantInsurancePolicies: [
                {
                    name: null,
                }
            ],
            otherPolicies: null,

        },
        question5: {
            industry: null,
            imNotSureSelected: null

        },
        question6: {
            biggestInterestsInCaptive: [
                {
                    name: null,
                }
            ],
            imNotSureSelected: null

        },
        question7: {
            name: null,
            companyName: null,
            email: null,
            phone: null
        }
    }



    function simplifyNumber(formattedNumber) {
        var value = formattedNumber.replace(/\$/g, '').trim();
        var multiplier = 1;
        if (value.endsWith('K')) {
            multiplier = 1000;
            value = value.slice(0, -1);
        } else if (value.endsWith('M')) {
            multiplier = 1000000;
            value = value.slice(0, -1);
        }
        return parseFloat(value) * multiplier;
    }


    $('.rating--icons--wrapper').css('opacity', '1');

    var filledStars = $('.rating--icon--filled');

    const starAnimate = (numberOfStars) => {

        for (var i = 0; i < numberOfStars; i++) {
            setTimeout((function (starIndex) {
                return function () {
                    var filledStar = filledStars.eq(starIndex);
                    filledStar.css('opacity', '1').addClass('scale-effect active');

                    setTimeout(function () {
                        //filledStar.removeClass('active');
                    }, 400);
                };
            })(i), 200 * i);

            if (i === numberOfStars - 1) {
                setTimeout(() => {
                    if (numberOfStars >= 3) $('.confetti-lottie').eq(numberOfStars - 3).trigger('click')
                }, 500);

            }
        }

        setTimeout(() => {
            if (numberOfStars === 1) $('.star-rating--message.m-1').removeClass('hidden');
            else if (numberOfStars === 2) $('.star-rating--message.m-2').removeClass('hidden');
            else if (numberOfStars === 3) $('.star-rating--message.m-3').removeClass('hidden');
            else if (numberOfStars === 4) $('.star-rating--message.m-4').removeClass('hidden');
            else if (numberOfStars === 5) $('.star-rating--message.m-5').removeClass('hidden');
        }, 800);

    }


    $('.sm-conditional--button').on('click', (e) => {

        if ($(e.target).hasClass('no')) quiz.question1.makeMoneySellingInsurance = false;
        else if ($(e.target).hasClass('yes')) quiz.question1.makeMoneySellingInsurance = true;

    })


    const renderGraph = (data) => {
        const ctx = document.getElementById('myChart').getContext('2d');

        setTimeout(() => {
            $('.graph--mask').show()
        }, 1000);



        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => `Year ${item.year}`),
                datasets: [{
                    label: 'Annual Premium',
                    data: data.map(item => item.annual_premium),
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }, {
                    label: 'Reinsurance',
                    data: data.map(item => item.reinsurance),
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }, {
                    label: 'Estimated Losses',
                    data: data.map(item => item.estimated_losses),
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }, {
                    label: 'Admin Fees & Operational Expenses',
                    data: data.map(item => item.admin_fees_and_operational_expenses),
                    borderColor: 'rgb(153, 102, 255)',
                    borderWidth: 1
                }, {
                    label: 'Surplus & Investment Income',
                    data: data.map(item => item.surplus_and_investment_income),
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1
                }, {
                    label: 'Cumulative Surplus',
                    data: data.map(item => item.cumulative_surplus),
                    borderColor: 'rgb(255, 205, 86)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


    }

    //sm-button--submit
    $('.sm-button--submit').on('click', () => {

        if (quiz.question1.makeMoneySellingInsurance) {
            if ($('#Gross-Written-Premium').val()) quiz.question2a.grossWrittenPremium = $('#Gross-Written-Premium').val()
            if ($('#What-Is-Your-Loss-Ratio-percentage').val()) quiz.question2a.lossRatio = $('#What-Is-Your-Loss-Ratio-percentage').val()
            if (Boolean($('#Gross-Written-Premium').val()) && Boolean($('#What-Is-Your-Loss-Ratio-percentage').val())) {
                quiz.question2a.imNotSureSelected = false;
            } else {
                quiz.question2a.imNotSureSelected = true;
            }
        } else {
            if ($('#annual-insurance-premium').val()) quiz.question2b.spentOnAnnualPremiumms = $('#annual-insurance-premium').val()
            if (Boolean($('#annual-insurance-premium').val())) quiz.question2b.imNotSureSelected = false;
            else quiz.question2b.imNotSureSelected = true;

        }


        let minFormatted = simplifyNumber($('#claims-min--amount').val())
        let maxFormatted = simplifyNumber($('#claims-max--amount').val())
        if ($('#claims-min--amount').val()) quiz.question3.maxClaimsAmount = String(minFormatted);
        if ($('#claims-max--amount').val()) quiz.question3.minClaimsAmount = String(maxFormatted);

        if (Boolean($('#claims-min--amount').val()) && Boolean($('#claims-max--amount').val())) {
            quiz.question3.imNotSureSelected = false;
        } else {
            quiz.question3.imNotSureSelected = true;
        }


        var mostRelevantInsurancePolicies = [];


        $('.coverage-wrapper--grid input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                var coverageName = $(this).siblings('.s-coverage--checkbox--text').text();
                mostRelevantInsurancePolicies.push({ name: coverageName });
            }
        });

        if (mostRelevantInsurancePolicies.length > 0) quiz.question4.mostRelevantInsurancePolicies = mostRelevantInsurancePolicies;
        if ($('#Other-Coverage').val()) quiz.question4.otherPolicies = $('#Other-Coverage').val()

        if (Boolean($('#Other-Coverage').val()) && (mostRelevantInsurancePolicies.length > 0)) {
            quiz.question4.imNotSureSelected = false;
        } else {
            quiz.question4.imNotSureSelected = true;
        }

        if ($('.sm-dropdown--input--value').val()) quiz.question5.industry = $('.sm-dropdown--input--value').val();

        if (Boolean($('.sm-dropdown--input--value').val())) quiz.question5.imNotSureSelected = false;
        else quiz.question5.imNotSureSelected = true;

        var biggestInterestsInCaptive = [];

        $('.interest-wrapper--grid input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                var interestName = $(this).siblings('.s-interest--checkbox--text').text();
                biggestInterestsInCaptive.push({ name: interestName });
            }
        });

        if (biggestInterestsInCaptive.length > 0) quiz.question6.biggestInterestsInCaptive = biggestInterestsInCaptive;

        if (biggestInterestsInCaptive.length > 0) {
            quiz.question6.imNotSureSelected = false;
        } else {
            quiz.question6.imNotSureSelected = true;
        }


        if ($('#name').val()) quiz.question7.name = $('#name').val();
        if ($('#email').val()) quiz.question7.email = $('#email').val()
        if ($('#phone').val()) quiz.question7.phone = $('#phone').val()
        if ($('#company').val()) quiz.question7.companyName = $('#company').val()

        //LOADING START
        $('.rating--block').removeClass('hidden')
        $('.rating--block').css('opacity', '1')


        setTimeout(() => {
            $('.loading-animation').css('opacity', '1')
            $('.loading--heading').css('opacity', '1')
            $('.loading--heading').css('top', '0px')


        }, 500);

        $.ajax({
            url: 'https://server.xn.capital/api/users/submit-quiz',
            type: 'POST',
            headers: {
                'Authorization': 'eyJraWQiOiJ2NFQ2bVRUTloxdVFLZkJNSU5vK2ZOaUk2UkVYRFhzTTk1V2ZxOTYrVFlnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZTA1M2Y0Yi01NjZiLTRlNzctOWU5My0yNzMwOGRiMTIxZjEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9YTzdOTWc5N00iLCJjbGllbnRfaWQiOiI3ZnAxNGM5ZWczbGM5YzVpbzhkaTdnY2hqayIsIm9yaWdpbl9qdGkiOiJiNzJiMzU2NC0yOGQxLTQ4ZTQtYjUyNi00MTBjZmMxMTZhOGIiLCJldmVudF9pZCI6ImE5Y2I1Mzc0LTM1YTUtNGY1MS04OGNmLTJmODk5Mzc2MzY5MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDIzMjM3NjYsImV4cCI6MTcwMjMyNzM2NiwiaWF0IjoxNzAyMzIzNzY2LCJqdGkiOiI4YzJiYTdmZS1lNzk5LTQzYTYtYjlmYi01ODIzNDk0ZTU2YzYiLCJ1c2VybmFtZSI6ImNlMDUzZjRiLTU2NmItNGU3Ny05ZTkzLTI3MzA4ZGIxMjFmMSJ9.NFJEucIZmU2GzxYPwG38WJ3qlkwTGmlyNbjH9hsBVuBmbPtuFmID2oOqF8H2_3RxHm0fpU_u9uxj40e9AZ8zhHvW6zZUTJVpJDwy0VgiZTBoOEKj-g5X9PgUVdkVwJrGAhf1svJiQ1ruWToo9Bq6nfFR7_6nr99sGnqKLZbPpL3UZIJoShOOtQklWCSi8-PdmUEnr-0GdIYakqaEKHekfGOHfqYyEpZeIqVrsv2qnDOBlW0ShOIiTVrhin5jDl9nRg963JTlgnyPmtMX5P73Bh1uh3YegYSTl8Tn8GXrmKG2wwzqSoTKm44l5Nt3Gz1AiHcQbtwEStdFK2iAnLhcAw' // Include the accessToken in the Authorization header
            },
            contentType: 'application/json',
            data: JSON.stringify(quiz),
            success: function (response) {
                console.log('Quiz submitted successfully:', response);
                let rating = response.responseData.star_rating
                console.log(rating)
                setTimeout(() => {
                    $('.loading--container').css('opacity', '0%')
                    setTimeout(() => {
                        $('.loading--container').css('display', 'none')
                        $('.rating--container').css('display', 'block')
                        setTimeout(() => {
                            $('.rating--container').css('opacity', '1')

                            setTimeout(() => {
                                starAnimate(rating)
                                // renderGraph(response.responseData.model)
                            }, 1000);
                        }, 200);

                    }, 500);
                }, 100);



            },
            error: function (xhr, status, error) {
                console.error('Submission failed:', xhr.responseText);
            }
        });
    })


});
