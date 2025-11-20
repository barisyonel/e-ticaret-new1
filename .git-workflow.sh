#!/bin/bash

# Git Workflow Script - Branch oluştur, push et, main'e merge et
# Kullanım: ./git-workflow.sh "commit mesajı"

COMMIT_MSG=${1:-"Update: Değişiklikler"}

# Mevcut branch'i kontrol et
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "main" ]; then
    # Main'deysek yeni branch oluştur
    BRANCH_NAME="update/$(date +%Y%m%d-%H%M%S)"
    echo "📦 Yeni branch oluşturuluyor: $BRANCH_NAME"
    git checkout -b "$BRANCH_NAME"
else
    # Zaten bir branch'teysek onu kullan
    BRANCH_NAME="$CURRENT_BRANCH"
    echo "📦 Mevcut branch kullanılıyor: $BRANCH_NAME"
fi

# Değişiklikleri ekle ve commit et
echo "📝 Değişiklikler commit ediliyor..."
git add -A
git commit -m "$COMMIT_MSG"

# Branch'i push et
echo "🚀 Branch push ediliyor: $BRANCH_NAME"
git push -u origin "$BRANCH_NAME"

# Main'e geç ve merge et
echo "🔄 Main'e geçiliyor..."
git checkout main
echo "🔀 Branch main'e merge ediliyor..."
git merge "$BRANCH_NAME" --no-edit

# Main'i push et (Vercel otomatik deploy edecek)
echo "🚀 Main push ediliyor (Vercel deploy başlayacak)..."
git push origin main

echo "✅ İşlem tamamlandı!"
echo "📋 Branch: $BRANCH_NAME"
echo "🌐 Vercel otomatik olarak deploy edecek"

