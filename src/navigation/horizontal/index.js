export default [
  {
    title: 'Home',
    to: { name: 'pages-user-profile-tab', params: { tab: 'profile' } },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Account',
    to: { name: 'pages-account-settings-tab', params: { tab: 'account' } },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Academy',
    icon: { icon: 'tabler-book' },
    children: [
      { title: 'Dashboard', to: 'apps-academy-dashboard' },
      { title: 'My Course', to: 'apps-academy-my-course' },
      { title: 'Course Details', to: 'apps-academy-course-details' },
    ],
  },
  {
    title: 'Invoice',
    icon: { icon: 'tabler-file-dollar' },
    children: [
      { title: 'List', to: 'apps-invoice-list' },
      { title: 'Preview', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
      { title: 'Edit', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
      { title: 'Add', to: 'apps-invoice-add' },
    ],
  },
]
