$(document)
.ready(function() {

    // scrollspy
    $('#mainMenu').ddscrollSpy({scrolltopoffset: -81});
    $('#sidebarMenu').ddscrollSpy({scrolltopoffset: -81});

    // criar o sidebar
    $('.ui.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('attach events', '.toc.item');

    // inicar as abas
    $('#abas-capacitacao .item').tab();

    // ativar os botões que exibem as abas
    $('#btn-capacitacao').on('click', function() {        
        $('#abas-container').transition('slide down');
    });

    // carregar os twitters
    $('#twitter-container').twittie({
        username: 'ayty_ufpb',
        list: 'site',
        dateFormat: '%d/%m/%Y',
        template: '<div class="column">' + 
                                         
                    '<h3 class="ui header">'+
                        '{{avatar}}'+
                        '<div class="content">'+
                            '{{user_name}}'+
                            '<div class="sub header">{{screen_name}}</div>'+
                        '</div>'+
                    '</h3>'+

                    /*'{{avatar}}'+
                    '<h3 class="ui header">' + 
                        '{{user_name}}' + 
                        '<div class="sub header">{{screen_name}}</div>' + 
                    '</h3>' + */

                    '<p>{{tweet}}<h6>{{date}}</h6></p>' + 
                    '</div>',
        count: 10
    });

    // validação do formulário de contato
    $('.ui.form')
    .form({
        fields: {
        nome: {
            identifier  : 'nome',
            rules: [
            {
                type   : 'empty',
                prompt : 'Por favor informe seu nome'
            },
            {
                type   : 'length[6]',
                prompt : 'Seu nome não pode ter menos que 6 caracteres'
            }
            ]
        },
        email: {
            identifier  : 'email',
            rules: [
            {
                type   : 'empty',
                prompt : 'Por favor informe seu e-mail'
            },
            {
                type   : 'email',
                prompt : 'Por favor informe um e-mail válido'
            }
            ]
        },
        mensagem: {
            identifier  : 'mensagem',
            rules: [
            {
                type   : 'empty',
                prompt : 'Por favor informe sua mensagem'
            },
            {
                type   : 'length[15]',
                prompt : 'Sua mensagem não pode ter menos que 15 caracteres'
            }
            ]
        }
        }
    });


    // evento click do botão de enviar
    $('.ui.submit.button').on('click', function(){
        if( $('.ui.form').form('is valid') ) {
            
            var urlData =   "&nome=" + $('#nome').val() + 
                            "&email=" + $('#email').val() + 
                            "&msg=" + $('#mensagem').val() ;
            
            $.ajax({
                type: "POST",
                url: "api/sendmail.php",
                async: true,
                data: urlData,
                success: function(data) {
                    var retorno = JSON.parse(data);

                    if(retorno.sucesso){
                        $('.ui.success.message').html(retorno.mensagem);
                        $('.ui.form').form('reset');
                    } else {
                        $('.ui.error.message').html(retorno.mensagem).transition('fade');    
                    }                    
                },
                error: function(data) {
                    $('.ui.error.message').html(data);
                },
                beforeSend: function() {
                    $('.ui.dimmer').removeClass('inactive').addClass('active');
                },
                complete: function(){
                    $('.ui.dimmer').removeClass('active').addClass('inactive');
                }
            });
        }
    });    
});