$(document).ready(() => {

  $('.carousel').carousel()

  $('.deck').click(() => {
    console.log('deck clicked');
    let deck_id = $(event.target).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '',
      data: {
        deck_id: deck_id
      },
      success: (data) => {
        location.href = `/decks/${deck_id}`
      },
      error: () => {}
    })
  })

  $('.sampleDeck').click(() => {
    console.log('deck clicked');
    let deck_id = $(event.target).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '',
      data: {
        deck_id: deck_id
      },
      success: (data) => {
        location.href = `/decks/sample/${deck_id}`
      },
      error: () => {}
    })
  })


 // search functionality
 $('.searchThing').click(() => {
    console.log('clicking on search form');
    let search = $('.quickSearch').val()
    console.log('search', search);
    $.ajax({
      method: 'GET',
      url: '/decks/searchy/',
      data: {
        search: search
      },
      success: (data) => {
        if (data) {
           console.log('inside ajax of btn destoy');
          location.href = `/decks/sample/${search}`
          // res.render(`decks`, {
          //   deck: cards,
          //   cardOne: firstCard
          // })
        }
      },
      error: (data2) => {
         console.log(data2)
      }
    })
})

  $('body').keyup(function(e) {
    if (e.keyCode == 32) {
      $('.click').toggleClass("flipped")
    }
  });

  //flip cards on click
  $('.card').click((event) => {
    if ($(event.target).hasClass("flipped")) {
      console.log($(event.target));
      $(event.target).removeClass("flipped")
    } else {
      $(event.target).addClass("flipped");
    }
  })

  //delete functionality on individual decks
  $('.btnDestroy').click((e) => {
    e.stopPropagation();
    let id = $(event.target).attr('data-id');
    console.log('event target', event.target);
    console.log('id', id);
    $.ajax({
      method: 'DELETE',
      url: '/decks',
      data: {
        id: id
      },
      success: (data) => {
        if (data) {
           console.log('inside ajax of btn destoy', data);
          location.reload();
        }
      },
      error: () => {}
    })
  })

    $('.faceBtn').click(() => {
      console.log('yay!!');

   })

  //update individual deck info
  $('.btnUpdate').click((event) => {
     event.stopPropagation();
    let deck_id = $(event.target).attr('data-id');
    $.ajax({
      method: 'PUT',
      url: '/decks',
      data: {
        deck_id: deck_id
      },
      success: (data) => {
        if (data) {
           console.log('inside ajax of btn update');
          location.href = `/update/${deck_id}`
        }
      },
      error: () => {}
    })
  })
  // add more rows to update/create
  $('.addMore').click(() => {
    $('.addMoreRows').append(`<div class="jumbotron col-sm-3 col-md-3 createC">
                            <textarea class="form-control createText f" rows="1" name="front" data-id="1" placeholder="front"></textarea>
                            <textarea class="form-control createText" rows="1" name="back" data-id="1" placeholder="back"></textarea>
                            <span class="glyphicon glyphicon-remove xmove" aria-hidden="true"></span>
                        </div>`)
  })

  $('.addUpdate').click(() => {
    $('.addMoreRows').append(`<div class="jumbotron col-sm-3 col-md-5 updateC">
              <textarea class="form-control updateText f" rows="2" name="front" data-id="{{this.id}}">Front</textarea>
              <textarea class="form-control updateText" rows="8" name="back" data-id="{{this.id}}">Back</textarea><span class="glyphicon glyphicon-remove xmove" aria-hidden="true"></span>
          </div>`)
  })

  // delete rows from update/create
  $('.addMoreRows').on('click', '.xmove', () => {
    $(event.target).parent().remove()
  })

})
