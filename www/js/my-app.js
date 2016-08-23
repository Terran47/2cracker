// Initialize your app
var myApp = new Framework7({
    swipePanel:'left',
    modalTitle:'2cracker.org'
});

// Export selectors engine
var $$ = Dom7;

// Add view

var mainView = myApp.addView('.view-main');

$$(document).on('click', 'a', function(){
    myApp.closePanel();
});

$$(document).on('click', 'a.open-menu', function(){
    myApp.openPanel('left');
});

$$(document).on('click', 'input.submit-login', function(){
    var email = $$('input.email-user').val();
    var password = $$('input.password-user').val();

    if(email != '' && password != ''){
        $$.ajax({
            url:'http://2cracker.org/api/users',
            type:'get',
            data:{
                'email':email,
                'password':password,
            },
            success:function(user){
                if(user != 'error'){
                    var userJson = JSON.parse(user);
                    window.localStorage.setItem('token', userJson.token);
                    tokenUser(window.localStorage.getItem('token'));
                }else{
                    myApp.alert('Такого пользователя нет!');
                }
            }
        });
    }else{
        myApp.alert('Заполните поля!');
    }

});

tokenUser(window.localStorage.getItem('token'));






function tokenUser(token){
        $$.ajax({
            url:'http://2cracker.org/api/token',
            type:'get',
            data:{
                'token':token,
            },
            success:function(user){
                if(user != 'error'){
                    var userJson = JSON.parse(user);

                    $$('.auth-block').html('<h4>Приветствую! '+userJson.name+'</h4><p><a href="http://2cracker.org/api/words?token='+userJson.token+
                        '">Слова на сегодня</a></p><a href="info.html" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">Как эффективно запоминать?</div></div></div></a><hr><h3 class="user-logout">Выход</h3>');
                    mainView.router.back();

                }
            }
        });
}

$$(document).on('click', 'h2.user-logout', function(){
    myApp.closePanel();
    window.localStorage.removeItem('token');
    $$('.auth-block').html('<a href="login.html">Авторизация</a>');
    mainView.router.back({
      url: 'index.html', // - in case you use Ajax pages
      pageName: 'index', // - in case you use Inline Pages or domCache
      force: true
    });

});



// Callbacks to run specific code for specific pages, for example for About page:
$$(document).on('pageInit', function (page) {
    
    var page = page.detail.page;


});



  // Bind Click event to the drop down navigation button
  $$(document).on('click','.nav-button',function() {
    /*  Toggle the CSS closed class which reduces the height of the UL thus 
        hiding all LI apart from the first */
    $$(this).parent().parent().toggleClass("closed");
  });







                           





