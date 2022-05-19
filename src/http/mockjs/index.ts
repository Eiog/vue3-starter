import { mock, Random } from 'mockjs'
mock('/api/tesc', 'get', {
    "name": Random.cname()
})