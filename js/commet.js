// 点击菜单栏, 左边菜单栏左移
$('.rg_nav .pull-left').click(function(){
//   alert(1);
  $('.lt_aside,.rg_nav,.rg_main').toggleClass('menu_tog');
//   $('.rg_nav').css('paddingLeft',0);
//   $('.rg_main').css('paddingLeft',0);
})

// 点击退出 显示模态框
$('.rg_aside .pull-right').click(function(){
//   alert(1)
    $('#out_modal').modal('show')
})
// 点击确认退出 返回登陆页面
$('#out_btn').click(function(){
    // alert(1)
    // 发送请求
    $.get('/employee/employeeLogout',function(res){
      console.log(res)
      if(res.success){
          $('#out_modal').modal('hide')
          location.href = 'login.html'
      }
    })
    // 关闭模态框
    // 回到登陆页面
})

// 点击分类管理, 切换slidedown 显示二级分类
$('.cate_tog').click(function(){
  $('.cate').slideToggle()
})

// 页面渲染
var current = 1;
rend()
function rend(){
    // 发送ajax

  $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{
        page:current,
        pageSize:5
      },
      success:function(res){
        console.log(res)
      }
  })
}