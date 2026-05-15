package core

type GenrenatorError struct {
	IsGenrenatorError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGenrenatorError(code string, msg string, ctx *Context) *GenrenatorError {
	return &GenrenatorError{
		IsGenrenatorError: true,
		Sdk:              "Genrenator",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GenrenatorError) Error() string {
	return e.Msg
}
