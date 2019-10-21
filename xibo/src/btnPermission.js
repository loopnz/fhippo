let roleBtns = [

  {
    b_name: 'pathological',
    children: [{
        b_id: 800001,
        b_name:'upload',
        router: [100010,100011]
      },
      {
        b_id: 800002,
        b_name: 'download',
        router: [100010,100011]
      },
      {
        b_id: 800003,
        b_name:'read',
        router: [100010,100011]
      },
      {
        b_id: 800004,
        b_name: 'delete',
        router: [100010,100011]
      },
      {
        b_id: 800005,
        b_name: 'mark',
        router: [100010,100011]
      },
      {
        b_id: 800006,
        b_name: 'edit',
        router: [100010,100011]
      },
    ]
  },
  {
    b_name: 'inspection',
    children: [{
        b_id: 800016,
        b_name:'upload',
        router: [100010,100012]
      },
      {
        b_id: 800017,
        b_name:'download',
        router: [100010,100012]
      },
      {
        b_id: 800018,
        b_name: 'read',
        router: [100010,100012]
      },
      {
        b_id: 800019,
        b_name: 'delete',
        router: [100010,100012]
      },
      {
        b_id: 800020,
        b_name: 'mark',
        router: [100010,100012]
      },
      {
        b_id: 800021,
        b_name: 'edit',
        router: [100010,100012]
      }
    ]
  },
  {
    b_name: 'pathologicalConsutation',
    children: [{
        b_id: 800007,
        b_name: 'initiating',
        router: [100020,100024]
      },
      {
        b_id: 800008,
        b_name: 'submit',
        router: [100020,100024]
      },
      {
        b_id: 800009,
        b_name: 'cancel',
        router: [100020,100024]
      }
    ]
  },
  {
    b_name: 'inspectionConsultation',
    children: [{
        b_id: 800022,
        b_name: 'initiating',
        router: [100020,100023]
      },
      {
        b_id: 800023,
        b_name: 'submit',
        router: [100020,100023]
      },
      {
        b_id: 800024,
        b_name: 'cancel',
        router: [100020,100023]
      }
    ]
  },
  {
    b_name: 'statistics',
    children: [

      {
        b_id: 800010,
        b_name: 'uploadDaily',
        router: [100030,100031]
      },
      {
        b_id: 800011,
        b_name: 'consultationDaily',
        router: [100030,100032]
      },
      {
        b_id: 800012,
        b_name: 'markDaily',
        router: [100030,100034]
      },
      {
        b_id: 800013,
        b_name: 'statistics',
        router: [100030,100033]
      },
    ]
  },
  {
    b_name: 'systemManage',
    children: [{
        b_id: 800014,
        b_name: 'roleManage',
        router: [100000,100001]
      },
      {
        b_id: 800015,
        b_name: 'userManage',
        router: [100000,100002]
      }
    ]
  }
]

export default roleBtns;

