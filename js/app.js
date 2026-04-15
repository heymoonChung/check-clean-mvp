document.addEventListener('DOMContentLoaded', () => {
    // Nav logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.screen-view');

    function switchScreen(targetId) {
        screens.forEach(s => s.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));

        document.getElementById(targetId).classList.add('active');
        document.querySelector(`.nav-btn[data-target="${targetId}"]`).classList.add('active');
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchScreen(btn.dataset.target);
        });
    });

    // Screen 1 Logic
    const optionBtns = document.querySelectorAll('.option-btn');
    const startMatchingBtn = document.getElementById('start-matching-btn');
    const loadingState = document.getElementById('matching-loading');
    
    // Group options by their parent
    const spaceOptions = document.getElementById('space-options').querySelectorAll('.option-btn');
    const materialOptions = document.getElementById('material-options').querySelectorAll('.option-btn');

    function handleSelection(optionsList, clickedBtn) {
        optionsList.forEach(btn => btn.classList.remove('selected'));
        clickedBtn.classList.add('selected');
    }

    spaceOptions.forEach(btn => {
        btn.addEventListener('click', () => handleSelection(spaceOptions, btn));
    });

    materialOptions.forEach(btn => {
        btn.addEventListener('click', () => handleSelection(materialOptions, btn));
    });

    startMatchingBtn.addEventListener('click', () => {
        const hasSpace = document.querySelector('#space-options .selected');
        const hasMaterial = document.querySelector('#material-options .selected');

        if (!hasSpace || !hasMaterial) {
            alert('공간 유형과 마감재를 모두 선택해주세요!');
            return;
        }

        // Show loading
        startMatchingBtn.style.display = 'none';
        loadingState.classList.remove('hidden');

        // Simulate match found and go to next screen after 2.5s
        setTimeout(() => {
            switchScreen('screen2');
            // Reset for replayability
            startMatchingBtn.style.display = 'block';
            loadingState.classList.add('hidden');
        }, 2500);
    });

    // Screen 2 Logic
    document.getElementById('finish-scan-btn').addEventListener('click', () => {
        switchScreen('screen3');
    });
});
