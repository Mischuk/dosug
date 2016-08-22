function subwaySort() {
  $('.m_subway-list li').each(function(){
    $(this).find('a b').parents('li').prev().css('display', 'block');
  });
};
subwaySort();