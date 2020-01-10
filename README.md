# register

## 회원가입

### 요청
> [POST] /mysample/register

전달값

<pre>
{
  'id':'gkdl',
  'score' : 11
}
</pre>

### 결과

#### 성공

<pre>
{
    "id": "gk12",
    "score": 11

}
</pre>

### 실패

<pre>
{
  'message':'400 Bad Response'
}
</pre>

## 점수가져오기

### 요청
> [POST] /mysample/login

전달값

<pre>
{  
  "id":"gk12",
  "password":"gk12"
}
</pre>

### 성공

<pre>
{
  "id:"gk12",
  "password":gk12",
  "score":11
  "rank" : 2
}
</pre>

### 실패

<pre>
{
"message":"400 Bad Response"
}
</pre>
