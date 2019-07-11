//item_list.php
  $(document).ready(function(){
    $('.add-stok-form').on("click",function(){
      var id = $(this).data('id');
      var nama = $(this).data('nama');
      var stok = $(this).data('stok');

      $(".tambah #add-stok-before").val(stok);
      $(".tambah #tambah-id").val(id);
    });

    $('.min-stok-form').on("click",function(){
      var id = $(this).data('id');
      var nama = $(this).data('nama');
      var stok = $(this).data('stok');

      $(".minus #min-stok-before").val(stok);
      $(".minus #minus-id").val(id);
    });


    //add stok modal
    $('.tambah #addstok').on("keyup",function(){
      var before = parseInt($('.tambah #add-stok-before').val());
      var inputstok = parseInt($('.tambah #addstok').val());
      $('.tambah #add-stok-after').val((before+inputstok) || before);
    });


    //minus stok modal
    $('.minus #minstok').on("keyup",function(){
      var before = parseInt($('.minus #min-stok-before').val());
      var inputstok = parseInt($('.minus #minstok').val());
      $('.minus #min-stok-after').val((before-inputstok) || before);
    });
  });