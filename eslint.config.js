import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    rules: {
      // 允许console语句
      'no-console': 'off',
      // 禁止结尾逗号
      'style/comma-dangle': ['error', 'never'],
      // 允许使用箭头函数作为最顶层函数定义
      'antfu/top-level-function': 'off',
      // JSON格式不需排序
      'jsonc/sort-keys': 'off'
    }
  }
)
