SRC = $(wildcard *.tex)
OBJ = $(SRC:.tex=.aux) $(SRC:.tex=.log) $(SRC:.tex=.nav) $(SRC:.tex=.out) $(SRC:.tex=.snm) $(SRC:.tex=.toc)
OUT = gonogo.pdf# Donnez le nonm des PDF (avec l'extention .pdf). Les noms doivent correspondre au nom du fichier source.

CC_TEX = latex# compile un .tex (en .dvi)
CC_DVI = dvips# compile un .dvi (en .ps)
CC_PS = ps2pdf# compile un .ps (en .pdf)
OPTS = 
VIEWER = evince

EDITOR = gedit
TMP_FILE = $(OBJ) $(SRC:.tex=.dvi) $(SRC:.tex=.ps)
GEN_FILE = $(OUT)



# Dépendances général ==========================================================


all : $(OUT)


open : $(OUT)
	@ $(VIEWER) $(OUT) &


clean :
	@ echo "\033[92m... clean !\033[39m"
	@ rm -f *~ $(TMP_FILE)


cleanall : clean
	@ rm -f $(GEN_FILE)


edit :
	@ $(EDITOR) $(SRC) &


dependency : 
	@ head -n`grep -n ^"# Dépendances générées automatiquement" makefile| cut -d ":" -f 1` makefile > temp_depend
	@ echo "\n" >> temp_depend
	@ for output in $(OUT); do \
		name=$${output%.pdf}; \
		if [ -f $$name.tex ]; then \
			echo "$$name : $$output\n\n" >> temp_depend; \
			\
			# 7 ps -> pdf \
			echo "$$output : $$name.ps" >> temp_depend; \
			echo '\t@ echo "\\033[1;33mcompilation de $$@\\033[21;39m"' >> temp_depend; \
			echo '\t$$(CC_PS) $$<' >> temp_depend; \
			echo '\t@ echo\n\n' >> temp_depend; \
			\
			# 13 dvi -> ps \
			echo "$$name.ps : $$name.dvi" >> temp_depend; \
			echo '\t@ echo "\\033[21;33m-> compilation de $$@\\033[39m"' >> temp_depend; \
			echo '\t$$(CC_DVI) $$< -o' >> temp_depend; \
			echo '\t@ echo\n\n' >> temp_depend; \
			\
			# 19 tex -> dvi \
			res=$$(sed -n -e "/^%/d;/[^\\]%/d;s/}\\\\/} \\\\/g;/\\\\input{.*}/p" $$name.tex | tr "\n" " "); \
			unset dependencies; \
			for i in $$res; do \
				dependency=$${i%\}}; \
				dependency=$${dependency#\\input\{}; \
				dependencies=$$dependencies" "$$dependency; \
			done; \
			echo "$$name.dvi : $$name.tex$$dependencies" >> temp_depend; \
			echo '\t@ echo "\\033[21;33m-> compilation de $$@\\033[39m"' >> temp_depend; \
			echo '\t$$(CC_TEX) $$< ' >> temp_depend; \
			echo '\t@ echo\n\n' >> temp_depend; \
		fi; \
	done
	@ mv temp_depend makefile


check :
	@ echo "SRC = "$(SRC)
	@ echo "OBJ = "$(OBJ)
	@ echo "OUT = "$(OUT)
	@ echo
	@ echo "CC_TEX = "$(CC_TEX)
	@ echo "CC_DVI = "$(CC_DVI)
	@ echo "CC_PS  = "$(CC_PS)
	@ echo "VIEWER = "$(VIEWER)
	@ echo
	@ echo "EDITOR = "$(EDITOR)
	@ echo "TMP_FILE = "$(TMP_FILE)
	@ echo "GEN_FILE = "$(GEN_FILE)



# Dépendances implicites =======================================================


%.dvi : %.tex
	@ echo "\033[0;33m-> compilation \033[4mimplicite\033[24m de $@\033[39m"
	$(CC_TEX) $< 
	@ echo


%.ps : %.dvi 
	@ echo "\033[0;33m-> compilation \033[4mimplicite\033[24m de $@\033[39m"
	$(CC_DVI) $< -o
	@ echo


%.pdf : %.ps 
	@ echo "\033[0;33mcompilation \033[4mimplicite\033[24m de $@\033[39m"
	$(CC_PS) $<
	@ echo



# Dépendances spécifiques ======================================================

# Dépendances générées automatiquement =========================================


gonogo : gonogo.pdf


gonogo.pdf : gonogo.ps
	@ echo "\033[1;33mcompilation de $@\033[21;39m"
	$(CC_PS) $<
	@ echo


gonogo.ps : gonogo.dvi
	@ echo "\033[21;33m-> compilation de $@\033[39m"
	$(CC_DVI) $< -o
	@ echo


gonogo.dvi : gonogo.tex ../Lancement/macro.tex
	@ echo "\033[21;33m-> compilation de $@\033[39m"
	$(CC_TEX) $< 
	@ echo


