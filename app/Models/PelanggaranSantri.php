<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PelanggaranSantri extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Get the pengurus that owns the PelanggaranSantri
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pengurus(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }

    /**
     * Get the pelanggaran that owns the PelanggaranSantri
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pelanggaran(): BelongsTo
    {
        return $this->belongsTo(Pelanggaran::class, 'pelanggaran_id')->withDefault();
    }

    /**
     * Get the santri that owns the PelanggaranSantri
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function santri(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nis', 'nis');
    }
}
