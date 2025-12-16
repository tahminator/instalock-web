vim.api.nvim_create_autocmd({ "BufEnter" }, {
	pattern = "Dockerfile.*",
	command = "set filetype=dockerfile",
})
