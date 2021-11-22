$(function() {
    // 'use strict'
    // create deal/ check validity 
    // TODO: 
    // Reset form after submit
    // get rid of extra rows
    $("#createDeal").click(function() {
        var institution = $('#InputInstitution')
        var type = $('#typeInput')
        var deal = $('#dealInput')
        var institutionVal = institution.val()
        var typeVal = type.val()
        var dealVal = deal.val()

        var newDeal = `<tr><td scope="row"> ${institutionVal}</td><td>${typeVal}</td> <td>${dealVal}</td> <td>YES</td> <td><button tabindex="0"class="deleteBtn">X</button></td></tr>`

        var forms = document.querySelectorAll('.needs-validation')

        // prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function(form) {
                form.addEventListener('submit', function(event) {
                    if (!form.checkValidity()) {
                        console.log(!form.checkValidity())
                        console.log(form.checkValidity())
                        event.preventDefault()
                        event.stopPropagation()
                        // add logic for each specific type of data
                    } else {
                        // fix duplicates
                        $('#dealTable').append(newDeal)
                    }

                    form.classList.add('was-validated')
                }, false)
            })


    })

    // delete row
    // if you had a db you would need to use ajax to find it and delete it
    $('#dealTable').on('click', '.deleteBtn', function() {
        $(this).closest("tr").remove()
    })



    // sort rows and cols

    function sortTable(f, n) {
        var rows = $('#dealTable tbody  tr').get();

        rows.sort(function(a, b) {

            var A = getVal(a);
            var B = getVal(b);

            if (A < B) {
                return -1 * f;
            }
            if (A > B) {
                return 1 * f;
            }
            return 0;
        });

        function getVal(elm) {
            var v = $(elm).children('td').eq(n).text().toUpperCase();
            if ($.isNumeric(v)) {
                v = parseInt(v, 10);
            }
            return v;
        }

        $.each(rows, function(index, row) {
            $('#dealTable').children('tbody').append(row);
        });
    }



    var f_sortInst = 1;
    var f_sortDeal = 1;
    var f_sortType = 1;
    var f_sortPub = 1;

    $("th").click(function() {


        console.log('click')
        var elementId = $(this).attr('id')

        switch (elementId) {
            case "sortInst":
                {
                    console.log('forst')
                    f_sortInst *= -1;
                    var n = $(this).prevAll().length;
                    sortTable(f_sortInst, n);
                    break;
                }
            case "sortDeal":
                {
                    f_sortDeal *= -1;
                    var n = $(this).prevAll().length;
                    sortTable(f_sortDeal, n);
                    break;
                }
            case "sortType":
                {
                    f_sortType *= -1;
                    var n = $(this).prevAll().length;
                    sortTable(f_sortType, n);

                    break;
                }
            case "sortPub":
                {
                    f_sortPub *= -1;
                    var n = $(this).prevAll().length;
                    sortTable(f_sortPub, n);
                    break;
                }

        }


    });




});