// 点击菜单栏, 左边菜单栏左移
$('.rg_nav .pull-left').click(function () {
  //   alert(1);
  $('.lt_aside,.rg_nav,.rg_main').toggleClass('menu_tog');
  //   $('.rg_nav').css('paddingLeft',0);
  //   $('.rg_main').css('paddingLeft',0);
})

// 点击退出 显示模态框
$('.rg_aside .pull-right').click(function () {
  //   alert(1)
  $('#out_modal').modal('show')
})
// 点击确认退出 返回登陆页面
$('#out_btn').click(function () {
  // alert(1)
  // 发送请求
  $.get('/employee/employeeLogout', function (res) {
    console.log(res)
    if (res.success) {
      $('#out_modal').modal('hide')
      location.href = 'login.html'
    }
  })
  // 关闭模态框
  // 回到登陆页面
})

// 点击分类管理, 切换slidedown 显示二级分类
$('.cate_tog').click(function () {
  $('.cate').slideToggle()
})




//封装渲染页面
function rend(ajax, count) {
  // 发送ajax
  $.ajax({
    url: ajax.url,
    type: ajax.type,
    data: {
      page: count,
      pageSize: 5,
    },
    success: function (res) {
      // 渲染表格
      // console.log(res);
      $('.rg_main tbody').html(template('temp', res))
      // 设置分页器
      setPaginator(ajax, res);
    }
  })
}
// 封装 分页器
function setPaginator(ajax, infor) {
  //参数:  渲染分页器的时候, 在点击分页的回调里面需要重新渲染页面
  // 参数: ajax  重新渲染发送的ajax,  infor发送ajax的结果 
  // 调用分页器
  $("#paginator").bootstrapPaginator({
    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
    currentPage: current,//当前页
    totalPages: Math.ceil(infor.total / infor.size),//总页数
    size: "small",//设置控件的大小，mini, small, normal,large
    onPageClicked: function (event, originalEvent, type, page) {
      //为按钮绑定点击事件 page:当前点击的按钮值
      current = page;
      rend(ajax, current);

    },
    // numberOfPages:1 
    // shouldShowPage:true
    // 重新设置分页器按钮的文字
    itemTexts: function (type, page, current) {
      // console.log(type,page, current)
      if (type === "first") {
        return "首页"
      }
      if (type === "next") {
        return "下一页"
      }
      if (type === "page") {
        return page;
      }
      if (type === "last") {
        return "尾页"
      }
      if (type === "prev") {
        return "上一页"
      }

    },
    // 去除 title 鼠标悬停文字
    tooltipTitles: function (type, page, current) {
      // console.log(type, page, current);
      return;
    }

  });
}