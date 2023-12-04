<?php //enviar email com o hash para o usuário

    // pegar os dados do Post
    $nome     = $_POST['nome']  or die('Nome vazio');
    $email    = $_POST['email'] or die('E-mail vazio');
    $mensagem = $_POST['msg']   or die('Mensagem vazia');
    
    //variáveis do mail()
    $para       = 'contato@ayty.org';
    $assunto    = 'Formulário de Contato AYTY';
    $headers    = 'From: ' . $nome . ' <' . $email . '>' . "\r\n";
    $headers   .= 'Reply-To: ' . $email . "\r\n";
    $headers   .= 'MIME-Version: 1.0' . "\r\n";
    $headers   .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
    $mensagem   = $mensagem;

    if (mail($para, $assunto, $mensagem, $headers)) {        
        echo json_encode(array('sucesso' => true, 'mensagem' => 'Mensagem enviada com sucesso!'));
    } else {
        echo json_encode(array('sucesso' => false, 'mensagem' => 'Erro ao enviar a mensagem.'));
    }

?>