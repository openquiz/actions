# openquiz

Events log:

opened: https://github.com/openquiz/openquiz/runs/440329041?check_suite_focus=true

edited: https://github.com/openquiz/openquiz/runs/440343763?check_suite_focus=true

labeled: https://github.com/openquiz/openquiz/runs/440329050?check_suite_focus=true

模板创建自带 label 的话，会同时出发 Open 和 Label 两个事件

## Quiz
```json
[
  {
    "question": "How many episodes of Friends in total?",
    "type": "number",
    "difficulty": 1,
    "answer": 236,
    "author": "Leplay",
    "author_link": "https://github.com/leplay/"
  },
  {
    "question": "What's the color of the fourth dot between FRIENDS on cover?",
    "type": "choice",
    "difficulty": 4,
    "choices": [
      "Red",
      "Yellow",
      "Blue",
      "Green"
    ],
    "answer": "Red",
    "author": "Leplay",
    "author_link": "https://github.com/leplay/"
  }
]
```

## Title
```json
{
  "id": "friends",
  "name": "Friends",
  "type": "tv_show",
  "imdb": "https://www.imdb.com/title/tt0108778/"
}
```
Title 的问题数量、管理员、贡献数量放到 README？