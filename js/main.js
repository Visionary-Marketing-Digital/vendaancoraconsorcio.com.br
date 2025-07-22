(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.sticky-top').addClass('shadow-sm').css('top', '0px');
    } else {
      $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
    }
  });

  // Hero Header carousel
  $(".header-carousel").owlCarousel({
    animateOut: 'slideOutDown',
    items: 1,
    autoplay: true,
    smartSpeed: 500,
    dots: false,
    loop: false,
    nav : true,
    mouseDrag: false,   // <-- desativa arrasto com o mouse
    touchDrag: false,   // <-- desativa arrasto com o dedo
    navText : [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-down"></i>'
    ],
  });

  // attractions carousel
  $(".attractions-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: false,
    loop: true,
    margin: 25,
    nav : true,
    navText : [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: { items:1 },
      576: { items:2 },
      768: { items:2 },
      992: { items:3 },
      1200: { items:4 },
      1400: { items:4 }
    }
  });

  // testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav : true,
    navText : [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: { items:1 },
      576: { items:1 },
      768: { items:1 },
      992: { items:1 },
      1200: { items:1 }
    }
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 5,
    time: 2000
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      $('.back-to-top-float').fadeIn('slow').css('display', 'flex');
    } else {
      $('.back-to-top-float').fadeOut('slow');
    }
  });
  $('.back-to-top-float').click(function () {
    $('html, body').animate({scrollTop: 0}, 300, 'easeInOutExpo');
    return false;
  });

  // Faq toggle
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  // Data e Relógio em tempo real
  function atualizarDataHora() {
    const agora = new Date();
    const utc = agora.getTime() + (agora.getTimezoneOffset() * 60000);
    const brasilia = new Date(utc - (3 * 60 * 60000)); // UTC-3

    const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const diaSemana = dias[brasilia.getDay()];

    const dia = String(brasilia.getDate()).padStart(2, '0');
    const mes = String(brasilia.getMonth() + 1).padStart(2, '0');
    const ano = brasilia.getFullYear();

    const horas = String(brasilia.getHours()).padStart(2, '0');
    const minutos = String(brasilia.getMinutes()).padStart(2, '0');

    const texto = `${diaSemana}, ${dia}/${mes}/${ano} - ${horas}:${minutos}`;

    document.getElementById("dataHora").textContent = texto;
  }

  setInterval(atualizarDataHora, 1000);
  atualizarDataHora();

  // Aqui vamos garantir que o DOM está pronto para manipular formulários e máscara
  $(document).ready(function () {

    // Form submit com AJAX, evitando recarregar página
    $('#formLead').submit(function(e) {
        e.preventDefault();

        // Remove "R$" do campo de valor antes de enviar
        var valorOriginal = $('#valorDesejado').val();
        var valorFormatado = valorOriginal.replace('R$', '').trim();
        $('#valorDesejado').val(valorFormatado);

        var dados = $(this).serialize();

        // Restaura o valor com "R$" no input (opcional, para a experiência do usuário)
        $('#valorDesejado').val(valorOriginal);

        $.post($(this).attr('action'), dados)
            .done(function(resposta) {
            $('#formLead')[0].reset();
            var modal = new bootstrap.Modal(document.getElementById('modalSucesso'));
            modal.show();

            setTimeout(function () {
                modal.hide();
            }, 4000); // Fecha o modal após 4 segundos
        });
    });


    // Máscara do telefone
    $('#phone').mask('(00) 00000-0000');

    $(document).ready(function() {
        // Máscara para o campo de valor com R$
        $('#valorDesejado').mask('R$ 000.000.000,00', {reverse: true});
    });


  });

})(jQuery);
