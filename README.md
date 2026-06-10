# 银行存取款系统前端

这是一个基于 React、TypeScript 和 Vite 开发的银行存取款系统前端项目，主要用于银行账户开户、登录、存取款、转账、余额查询、流水查询和交易统计等业务操作。

## 技术栈

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

## 功能模块

- 首页功能入口：根据登录状态展示可访问的业务功能
- 开户：创建新账户并生成银行卡号
- 登录/退出：使用银行卡号和 6 位密码登录系统
- 存款：向指定银行卡账户增加余额
- 取款：从指定银行卡账户扣减余额
- 转账：在两个银行卡账户之间转移资金
- 余额查询：查看账户余额和账户状态
- 流水分页查询：按页码和每页条数查询交易流水
- 对账单查询：按时间区间查询交易明细
- 交易统计：统计指定时间范围内的交易笔数和金额
- 无交易账户查询：查看没有发生过交易的账户
- 网络异常处理：后端服务不可用时自动跳转到异常提示页

## 项目结构

```text
src
├── api              # 后端接口封装、Axios 实例、登录态存储
├── components       # 通用页面布局、路由守卫、UI 基础组件
├── hooks            # 登录态和接口请求状态 Hook
├── lib              # 功能入口配置、金额和时间格式化工具
├── pages            # 各业务页面
├── types            # 后端数据类型定义
├── App.tsx          # 路由入口
└── main.tsx         # React 应用入口
```

## 后端接口配置

默认后端地址为：

```text
http://localhost:8080/api
```

如果后端地址不同，可以新建 `.env.local` 文件进行覆盖：

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

项目中提供了 `.env.example` 作为配置示例。

## 运行方式

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

运行代码检查：

```bash
npm run lint
```

## 主要设计说明

本项目将页面、接口、登录状态和公共 UI 进行了拆分，便于维护和答辩说明：

- `src/api/bank.ts` 统一封装银行业务 API，页面不直接拼接接口地址。
- `src/api/http.ts` 统一创建 Axios 实例，集中处理接口基础地址、请求头和错误消息。
- `src/api/auth.ts` 使用 `localStorage` 保存 token 和当前银行卡号，并通过自定义事件同步页面登录状态。
- `src/components/RequireAuth.tsx` 和 `src/components/RequireGuest.tsx` 分别处理登录用户和游客页面访问权限。
- `src/hooks/useApiAction.ts` 统一封装接口调用时的 loading、成功提示和错误提示。
- `src/components/FeaturePageLayout.tsx` 统一业务页面结构，使页面风格保持一致。

## 期末作业展示建议

演示时可以按照以下顺序讲解：

1. 启动前端和后端服务，进入首页查看功能入口。
2. 先开户，获得银行卡号。
3. 使用银行卡号和密码登录。
4. 依次演示存款、取款、转账和余额查询。
5. 演示流水分页查询、对账单查询和交易统计。
6. 说明项目如何通过路由守卫限制未登录用户访问核心业务页面。
7. 说明 Axios 统一封装和环境变量配置方式。
