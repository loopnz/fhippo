// 权限按钮,router存放此按钮所在菜单的id,b_id表示此按钮权限的id
let roleBtns = [{
    b_name: 'pathological', //病理玻片
    children: [{
        b_id: 800001,
        b_name: 'upload',
        router: [100010, 100011]
      },
      {
        b_id: 800002,
        b_name: 'download',
        router: [100010, 100011]
      },
      {
        b_id: 800003,
        b_name: 'read',
        router: [100010, 100011]
      },
      {
        b_id: 800004,
        b_name: 'delete',
        router: [100010, 100011]
      },
      {
        b_id: 800005,
        b_name: 'mark',
        router: [100010, 100011]
      },
      {
        b_id: 800006,
        b_name: 'edit',
        router: [100010, 100011]
      }, {
        b_id: 800007,
        b_name: 'consultation',
        router: [100010, 100011]
      }, {
        b_id: 800008,
        b_name: 'export',
        router: [100010, 100011]
      },
    ]
  },
  {
    b_name: 'inspection', //检验玻片
    children: [{
        b_id: 810001,
        b_name: 'upload',
        router: [100010, 100012]
      },
      {
        b_id: 810002,
        b_name: 'download',
        router: [100010, 100012]
      },
      {
        b_id: 810003,
        b_name: 'read',
        router: [100010, 100012]
      },
      {
        b_id: 810004,
        b_name: 'delete',
        router: [100010, 100012]
      },
      {
        b_id: 810005,
        b_name: 'mark',
        router: [100010, 100012]
      },
      {
        b_id: 810006,
        b_name: 'edit',
        router: [100010, 100012]
      }, {
        b_id: 810007,
        b_name: 'consultation',
        router: [100010, 100012]
      }, {
        b_id: 810008,
        b_name: 'export',
        router: [100010, 100012]
      },
    ]
  },
  {
    b_name: 'allConsutation', //全部会诊
    children: [{
        b_id: 820001,
        b_name: 'cancel',
        router: [100020, 100025]
      },
      {
        b_id: 820002,
        b_name: 'downloadSlide',
        router: [100020, 100025]
      },
      {
        b_id: 820003,
        b_name: 'read',
        router: [100020, 100025]
      },
      {
        b_id: 820004,
        b_name: 'mark',
        router: [100020, 100025]
      },
      {
        b_id: 820005,
        b_name: 'export',
        router: [100020, 100025]
      }
    ]
  },
  {
    b_name: 'myConsultation', //我的会诊
    children: [{
        b_id: 830003,
        b_name: 'read',
        router: [100020, 100026]
      },
      {
        b_id: 830004,
        b_name: 'mark',
        router: [100020, 100026]
      },
      {
        b_id: 830005,
        b_name: 'export',
        router: [100020, 100026]
      },
      {
        b_id: 830006,
        b_name: 'fillDiagnostic',
        router: [100020, 100026]
      }
    ]
  },
  {
    b_name: 'uploadDaily', //上传日报
    children: [{
      b_id: 840001,
      b_name: 'view',
      router: [100030, 100031]
    }, {
      b_id: 840002,
      b_name: 'export',
      router: [100030, 100031]
    }, ]
  },
  {
    b_name: 'consultationDaily', //会诊日报
    children: [{
      b_id: 850001,
      b_name: 'view',
      router: [100030, 100032]
    }, {
      b_id: 850002,
      b_name: 'export',
      router: [100030, 100032]
    }, ]
  },
  {
    b_name: "roleManage", //角色管理
    children: [{
        b_id: 860001,
        b_name: 'add',
        router: [100000, 100001]
      },
      {
        b_id: 860002,
        b_name: 'edit',
        router: [100000, 100001]
      },
      {
        b_id: 860003,
        b_name: 'delete',
        router: [100000, 100001]
      },
    ]
  },
  {
    b_name: "userManage", //用户管理
    children: [{
        b_id: 870001,
        b_name: 'add',
        router: [100000, 100002]
      },
      {
        b_id: 870002,
        b_name: 'edit',
        router: [100000, 100002]
      },
      {
        b_id: 870003,
        b_name: 'delete',
        router: [100000, 100002]
      }
    ]
  }
]

export default roleBtns;
