SRC = $(wildcard *.tex)
OBJ = $(SRC:.tex=.aux) $(SRC:.tex=.log) $(SRC:.tex=.nav) $(SRC:.tex=.out) $(SRC:.tex=.snm) $(SRC:.tex=.toc)
OUT = suivi.pdf# Donnez le nonm des PDF (avec l'extention .pdf). Les noms doivent correspondre au nom du fichier source.

CC = pdflatex
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
			res=$$(sed -n -e "/^%/d;/[^\\]%/d;s/}\\\\/} \\\\/g;/\\\\input{.*}/p" $$name.tex | tr "\n" " "); \
			echo '$$res';\
			unset dependencies; \
			for i in $$res; do \
				dependency=$${i%\}}; \
				dependency=$${dependency#\\input\{}; \
				dependencies=$$dependencies" "$$dependency; \
			done; \
			echo "$$name.pdf : $$name.tex$$dependencies" >> temp_depend; \
			echo '\t@ echo "\\033[21;33m-> compilation de $$@\\033[39m"' >> temp_depend; \
			echo '\t$$(CC) $$< ' >> temp_depend; \
			echo '\t@ echo\n\n' >> temp_depend; \
		fi; \
	done
	@ mv temp_depend makefile


check :
	@ echo "SRC = "$(SRC)
	@ echo "OBJ = "$(OBJ)
	@ echo "OUT = "$(OUT)
	@ echo
	@ echo "CC     = "$(CC)
	@ echo "VIEWER = "$(VIEWER)
	@ echo
	@ echo "EDITOR = "$(EDITOR)
	@ echo "TMP_FILE = "$(TMP_FILE)
	@ echo "GEN_FILE = "$(GEN_FILE)



# Dépendances implicites =======================================================


%.pdf : %.tex
	@ echo "\033[0;33m-> compilation \033[4mimplicite\033[24m de $@\033[39m"
	$(CC) $< 
	@ echo



# Dépendances spécifiques ======================================================



# Dépendances générées automatiquement =========================================


