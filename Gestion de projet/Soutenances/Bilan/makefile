SRC = $(wildcard *.tex)
OBJ = $(SRC:.tex=.aux) $(SRC:.tex=.log) $(SRC:.tex=.nav) $(SRC:.tex=.out) $(SRC:.tex=.snm) $(SRC:.tex=.toc)
OUT = $(SRC:.tex=.pdf)

CC   = pdflatex
OPTS = 
VIEWER = evince

EDITOR = gedit
TMP_FILE = $(OBJ)
GEN_FILE = $(OUT)



# Dépendances général ==========================================================


all : $(OUT)


$(OUT) : $(SRC)
	@ echo "\033[1;33mgénération de $@\033[21;39m"
	$(CC) $(OPTS) $(SRC)
	@ echo ""


open : $(OUT)
	@ $(VIEWER) $(OUT) &


clean :
	@ echo "\033[92m... clean !\033[39m"
	@ rm -f *~ $(TMP_FILE)


cleanall : clean
	@ rm -f $(GEN_FILE)


edit :
#	@ echo $(EDITOR) $(SRC) "&"
	@ $(EDITOR) $(SRC) &


check :
	@ echo "SRC = "$(SRC)
	@ echo "OBJ = "$(OBJ)
	@ echo "OUT = "$(OUT)
	@ echo
	@ echo "CC = "$(CC)
	@ echo "OPTS = "$(OPTS)
	@ echo "VIEWER = "$(VIEWER)
	@ echo
	@ echo "EDITOR = "$(EDITOR)
	@ echo "TMP_FILE = "$(TMP_FILE)
	@ echo "GEN_FILE = "$(GEN_FILE)



# Dépendances implicites =======================================================

# Dépendances spécifiques ======================================================

# Dépendances générées automatiquement =========================================

