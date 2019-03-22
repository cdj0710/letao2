
// 输入时的验证
$('form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        //校验用户名，对应name表单的name属性
        username: {
          validators: {
            //不能为空
            notEmpty: {
              message: '用户名不能为空'
            },
            //长度校验
            stringLength: {
              min: 3,
              max: 6,
              message: '用户名长度必须在3到6之间'
            },
            callback:{
              message:'用户名错误'
            }
          }
        },
        password:{
            validators: {
                //不能为空
                notEmpty: {
                  message: '账号不能为空'
                },
                //长度校验
                stringLength: {
                  min: 6,
                  max: 30,
                  message: '账号长度必须在6到30之间'
                },
                callback:{
                  message:'密码错误'
                }
              }
        }
      }
    
});

// 验证条件符合的回调函数
$("form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:$('form').serialize(),
        success:function(res){
          console.log(res)
          if(res.error == 1000){
            // alert('用户名不存在');
            $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
       

          }
          if(res.error == 1001){
            // alert('密码错误');
            $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback')

          }
          if(res.success){
            alert('成功');
            location.href = 'index.html';
          }
        }
    })
});


//重置按钮 , 只重置了表单项的内容, 没有重置验证信息
$('[type="reset"]').click(function(){
  // alert(1)
  $('form').data('bootstrapValidator').resetForm(true)
})